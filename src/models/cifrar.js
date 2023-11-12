import bcrypt from 'bcryptjs'

async function cifrar(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

async function comparar(password, passwordbd) {
    return await bcrypt.compare(password, passwordbd);
}

export { cifrar, comparar }