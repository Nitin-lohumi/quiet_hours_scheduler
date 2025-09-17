import { connectDB } from "../../../../Db/Connect";
import { Task } from "../../../../Model/TaskModel";
import { createClient } from "../../../../utils/supabase/server";
import transport from "../../../../services/NodeMailer";

export async function GET() {
  try {
    await connectDB();
    const supabase = await createClient();

    const now = new Date(); // UTC
    const tenMinLater = new Date(now.getTime() + 10 * 60 * 1000);

    const obje: any[] = [];
    const dueTasks = await Task.find({
      $or: [{ expire: false }, { notified: false }],
    });

    obje.push(dueTasks);
    let sentCount = 0;

    for (const val of dueTasks) {
      const taskDateTime = new Date(`${val.date}T${val.time}:00+05:30`);
      obje.push({
        task: val.task,
        taskDateTime,
        now,
        tenMinLater,
      });
      if (taskDateTime < now) {
        if (!val.expire) {
          await Task.updateOne({ _id: val._id }, { $set: { expire: true } });
        }
        continue;
      }

      if (taskDateTime >= now && taskDateTime <= tenMinLater && !val.notified) {
        const { data: user, error } = await supabase.auth.admin.getUserById(
          val.userId
        );
        if (error || !user?.user?.email) continue;

        const email = user.user.email;
        await transport.sendMail({
          from: process.env.MAIL_USER!,
          to: email,
          subject: ` Reminder: Task "${val.task}" is due soon`,
          html: `
  <div style="font-family: Arial, sans-serif; background: #f4f7fb; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      
      <h2 style="color: #e74c3c; text-align: center;"> Task Reminder</h2>
      
      <p style="font-size: 16px; color: #333;">
        Hello,<br />
        This is a reminder that your task is due <b>in 10 minutes</b>.
      </p>
      
      <div style="background: #f9f9f9; border-left: 4px solid #e74c3c; padding: 15px; margin: 20px 0; border-radius: 6px;">
        <p style="margin: 0; font-size: 16px; color: #333;">
          <b> Task:</b> ${val.task}<br/>
          <b> Date:</b> ${val.date}<br/>
          <b> Time:</b> ${val.time}
        </p>
      </div>
      
      <p style="font-size: 14px; color: #555;">
        Please make sure to complete your task on time 
        <br/><br/>
        Thanks,<br/>
        <b>The Quite Scheduler</b>
      </p>
    </div>
  </div>
  `,
        });

        await Task.updateOne({ _id: val._id }, { $set: { notified: true } });
        sentCount++;
      }
    }
    return new Response(JSON.stringify({ success: true, sentCount, obje }), {
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
