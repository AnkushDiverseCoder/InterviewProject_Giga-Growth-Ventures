import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const googleLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const { name, img } = user._doc;
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res
                .status(200)
                .json({ name, img, token });
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const { name, img } = savedUser;

            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res
                .status(200)
                .json({ name, img, token });
        }
    } catch (err) {
        res
            .status(500)
            .send(err.message);
    }
}

export const sendMail = async (req, res) => {
    try {
        let config = {
            service: 'gmail',
            auth: {
                user: 'thakurtulja0@gmail.com',
                pass: 'ujzhlfncjclsrvkr'
            }
        }

        const transporter = nodemailer.createTransport(config);

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Thakur Ankush Singh 👻" <thakurtulja0@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: req.body.subject, // Subject line
            text: req.body.body, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
        res.status(200).send(info.messageId);

    } catch (err) {
        res
            .status(500)
            .send(err.message);

    }
}