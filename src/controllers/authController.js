const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
    try{
        console.log("BODY:", req.body);
        const { email, password, name } = req.body;
        await registerUser(email, password, name);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });

    }catch(error){
        return res.status(400).json({ error: error.message });

    }
};

const login = async (req, res) => {
    try{
        const { email, password} = req.body;
        const token = await loginUser(email, password);
        res.status(200).json({ token });

    }catch(error){
        return res.status(400).json({ error: error.message });

    }
};

module.exports = {
    register,
    login
};