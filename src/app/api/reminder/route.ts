import { connectDB } from "../../../../Db/Connect";
import { Task } from "../../../../Model/TaskModel";
import { createClient } from "../../../../utils/supabase/server";
import transport from "../../../../services/NodeMailer";
export default async function Get(req: Request) {
  try {
    await connectDB();
    const supabase = await createClient();
    const now = new Date();
    const tenMinLater = new Date(now.getTime() + 10 * 60 * 1000);
    const dueTasks = await Task.find({
      dueTime: { $lte: tenMinLater, $gte: now },
      notified: false,
    });
    let sentCount = 0;
    for (const val of dueTasks) {
      const { data: user, error } = await supabase.auth.admin.getUserById(
        val.userId
      );
      if (!user?.user?.email || error) {
        continue;
      }
      const email = user.user.email;
      await transport.sendMail({
        from: process.env.MAIL_USER!,
        to: email,
        subject: `Reminder: Task "${val.title}" is due soon`,
        html: `<p>Your task "${val.title}" is due in 10 minutes.</p>`,
      });
      await val.updateOne({ _id: val._id }, { $set: { notified: true } });
      sentCount++;
    }
    return new Response(
      JSON.stringify({ success: true, remindersSent: sentCount }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: (err as any).message || "unknown" }),
      {
        status: 500,
      }
    );
  }
}
