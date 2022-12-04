const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../modules/User");

/*
	@route  POST api/users
	@desc   Register route
	@access Public
*/

router.post(
	"/",
	[
		check("name", "Name is required")
			.not()
			.isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with minimum of 6 characters"
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			// See if the user exists
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "user already exists" }] });
			}

			const avatar = 'avatar.png'

			user = new User({
				name,
				email,
				avatar,
				password
			});
			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			// Return jsonwebtoken
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			console.error(err);
			res.status(500).send("Runtime error");
		}
	}
);

module.exports = router;
