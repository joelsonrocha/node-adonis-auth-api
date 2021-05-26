 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import User from 'App/Models/User'

export default class UsersController {
    public async store({ request }: HttpContextContract) {
        const data = request.only(["email", "password"]);
    
        const user = User.create(data);
    
        return user;
      }
}
