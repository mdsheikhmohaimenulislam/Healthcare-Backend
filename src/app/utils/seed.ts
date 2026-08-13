import bcrypt from "bcryptjs";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import config from "../config";

//create tester Super admin

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdmin = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });

    if (isSuperAdmin) {
      console.log("Super Adim Already Exists!");
      return;
    }

    const name = config.super_admin_name;
    const email = config.super_admin_email;
    const password = config.super_admin_password;

    if (!name || !email || !password) {
      throw {
        success: false,
        statusCode: 500,
        message: "Super Admin Name, Email, Password missing in env file",
      };
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const superAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
        needPasswordChange: false,
        emailVerified: true,
      },
    });
  } catch (error) {
    console.log(error);

    await prisma.user.delete({
      where: {
        email: config.super_admin_email,
      },
    });
  }
};

//create tester admin

// create tester doctor
