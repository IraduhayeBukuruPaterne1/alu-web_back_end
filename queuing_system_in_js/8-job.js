export default function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) throw Error('Jobs is not an array');
    jobs.forEach((item) => {
        const job = queue.create('push_notification_code_3', item);
        job.on('enqueue', () => console.log(`Notification job created: ${job.id}`));
        job.on('complete', () => console.log(`Notification job ${job.id} completed`));
        job.on('failed attempt', (error) => console.log(`Notification job ${job.id} failed: ${error}`));
        job.on('progress', (progress) => console.log(`Notification job ${job.id} ${progress}% complete`));
        job.save();
    });

}
