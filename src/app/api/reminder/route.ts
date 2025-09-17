import { connectDB } from "../../../../Db/Connect";
import { Task } from "../../../../Model/TaskModel";
import { createClient } from "../../../../utils/supabase/server";
import transport from "../../../../services/NodeMailer";

export async function GET() {
  try {
    await connectDB();
    const supabase = await createClient();
    const now = new Date();
    const tenMinLater = new Date(now.getTime() + 10 * 60 * 1000);
    const obje = [];
    const dueTasks = await Task.find({
      $or: [{ expire: false }, { notified: false }],
    });
    obje.push(dueTasks);
    obje.push(process.env.SUPABASE_SERVICE_ROLE_KEY);
    let sentCount = 0;
    obje.push(tenMinLater);
    for (const val of dueTasks) {
      const taskDateTime = new Date(`${val.date}T${val.time}`);
      if (taskDateTime < now) {
        if (!val.expire) {
          console.log("Expired");
          obje.push("expiree");
          await Task.updateOne({ _id: val._id }, { $set: { expire: true } });
        }
        continue;
      }
      if (taskDateTime >= now && taskDateTime <= tenMinLater && !val.notified) {
        const { data: user, error } = await supabase.auth.admin.getUserById(
          val.userId
        );
        console.log("notify");
        console.log(error && error);
        obje.push(error?.message, "notify");
        if (error || !user?.user?.email) continue;
        const email = user.user.email;
        console.log("user:by supabse- ", user.user.email);
        obje.push(user.user.email);
        await transport.sendMail({
          from: process.env.MAIL_USER!,
          to: email,
          subject: `Reminder: Task "${val.task}" is due soon`,
          html: `<p>Your task <b>${val.task}</b> is due in 10 minutes.</p>`,
        });
        await Task.updateOne({ _id: val._id }, { $set: { notified: true } });
        sentCount++;
      }
    }
    return new Response(JSON.stringify({ success: true, obje }), {
      status: 200,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "unknown";
    console.error("Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
