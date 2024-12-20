import { createQueue } from "kue"
import createPushNotificationsJobs from "./8-job";
import { expect } from "chai";


describe('createPushNotificationsJobs', () => {
    let queue
    before(() => {
        queue = createQueue();
        queue.testMode.enter();
    })

    after(() => {
        queue.testMode.clear();
        queue.testMode.exit();
    });

    it('should create two new jobs to the queue', () => {
        const list = [
            {
                phoneNumber: '4153518780',
                message: 'This is the code 1234 to verify your account'
            },
            {
                phoneNumber: '4153518781',
                message: 'This is the code 4562 to verify your account'
            }
        ];
        createPushNotificationsJobs(list, queue);
        expect(queue.testMode.jobs.length).to.equal(2);
    });

    it('should throw an error if the jobs parameter is not an array', () => {
        expect(() => createPushNotificationsJobs('not an array', queue)).to.throw('Jobs is not an array');
    });

    it("should create a job with the right type", () => {
        const list = [
            {
                phoneNumber: '4153518780',
                message: 'This is the code 1234 to verify your account'
            }
        ];
        createPushNotificationsJobs(list, queue);
        expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    });
})
