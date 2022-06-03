import 'dotenv/config'; 
import axios from 'axios';
import { getPhoneNumberList } from '../util/memberList.js';


export async function checkQuota() {
    console.log('Checking SMS quota');
    const response = await axios.get(`https://textbelt.com/quota/${process.env.SMS_KEY}`);
    console.log(`Quota remaining: ${response.data.quotaRemaining}`);
    return response.data.quotaRemaining <= 0;
}

export async function notifyParticipents(results) {
    console.log('Notifying participents');
    const phoneNumbers = getPhoneNumberList();
    return Promise.all(
        Object.entries(results).map(([santa, victim]) => {
            return axios.post('https://textbelt.com/text', {
                phone: phoneNumbers[santa],
                message: `You have ${victim}`,
                key: `${process.env.SMS_KEY}${global.asTest ? '_test' : ''}`,
            }).then(response => {
                if (response.data.success) {
                    console.log(`Sent secret santa result to ${santa}`);
                } else {
                    console.log(`Failed to send result to ${santa} due to ${response.data.error}`);
                }
            })
        })
    );
}