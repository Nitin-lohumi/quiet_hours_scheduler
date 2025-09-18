import transport from "../../../../services/NodeMailer";
export async function GET() {
  try {
    await transport.sendMail({
      from: 'lohuminitin@gmail.com',
      to: "bawore2785@poesd.com",
      subject: ` Reminder: Task "" is due soon`,
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
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 404,
    });
  }
}
