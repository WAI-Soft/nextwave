<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * Handle contact form submission.
     *
     * @param ContactFormRequest $request
     * @return JsonResponse
     */
    public function submit(ContactFormRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            // Send email notification
            $this->sendContactEmail($data);

            // Log the contact form submission
            Log::info('Contact form submitted', [
                'name' => $data['name'],
                'email' => $data['email'],
                'subject' => $data['subject'],
                'timestamp' => now(),
            ]);

            return response()->json([
                'message' => 'Thank you for your message. We will get back to you soon!',
                'success' => true,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Contact form submission failed', [
                'error' => $e->getMessage(),
                'data' => $request->validated(),
            ]);

            return response()->json([
                'message' => 'Sorry, there was an error sending your message. Please try again later.',
                'success' => false,
            ], 500);
        }
    }

    /**
     * Send contact email notification.
     *
     * @param array $data
     * @return void
     */
    private function sendContactEmail(array $data): void
    {
        $to = config('mail.from.address', 'hello@nextwave.com');
        $subject = 'New Contact Form Submission: ' . $data['subject'];

        Mail::send([], [], function ($message) use ($data, $to, $subject) {
            $message->to($to)
                    ->subject($subject)
                    ->html($this->buildEmailContent($data));
        });
    }

    /**
     * Build the email content.
     *
     * @param array $data
     * @return string
     */
    private function buildEmailContent(array $data): string
    {
        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #555; }
                .value { margin-top: 5px; }
                .message-box { background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>New Contact Form Submission</h2>
                    <p>You have received a new message through the NextWave contact form.</p>
                </div>
                
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">' . htmlspecialchars($data['name']) . '</div>
                </div>
                
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">' . htmlspecialchars($data['email']) . '</div>
                </div>';

        if (!empty($data['phone'])) {
            $html .= '
                <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">' . htmlspecialchars($data['phone']) . '</div>
                </div>';
        }

        if (!empty($data['company'])) {
            $html .= '
                <div class="field">
                    <div class="label">Company:</div>
                    <div class="value">' . htmlspecialchars($data['company']) . '</div>
                </div>';
        }

        if (!empty($data['service'])) {
            $html .= '
                <div class="field">
                    <div class="label">Service Interest:</div>
                    <div class="value">' . htmlspecialchars($data['service']) . '</div>
                </div>';
        }

        $html .= '
                <div class="field">
                    <div class="label">Subject:</div>
                    <div class="value">' . htmlspecialchars($data['subject']) . '</div>
                </div>
                
                <div class="field">
                    <div class="label">Message:</div>
                    <div class="message-box">' . nl2br(htmlspecialchars($data['message'])) . '</div>
                </div>
                
                <div class="field">
                    <div class="label">Submitted:</div>
                    <div class="value">' . now()->format('Y-m-d H:i:s') . '</div>
                </div>
            </div>
        </body>
        </html>';

        return $html;
    }
}