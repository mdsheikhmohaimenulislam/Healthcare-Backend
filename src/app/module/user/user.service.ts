import { UploadApiResponse } from "cloudinary";
import httpStatus from "http-status";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

const uploadProfileImage = async (buffer: Buffer, userId: string) => {
  // cloudinary.uploader
  //   .upload_stream(
  //     {
  //       resource_type: "auto",
  //     },
  //     async (error, result) => {
  //       if (error) {
  //         console.log(error);
  //         throw new Error(error.message);
  //       }

  //       const uploadUser = await prisma.user.update({
  //         where: {
  //           id: userId,
  //         },
  //         data: {
  //           imageurl: result?.secure_url,
  //           imagePublickId: result?.public_id,
  //         },
  //       });

  //       console.log(uploadUser);
  //     },
  //   )
  //   .end(buffer);

  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      imagePublickId: true,
      imageurl: true,
    },
  });

  const cloudinaryResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
          },
          async (error, result) => {
            if (error) {
              return reject(error);
            }

            if (!result) {
              return reject(new AppError(httpStatus.INTERNAL_SERVER_ERROR, "No result returned from cloudinary"));
            }

            return resolve(result);
          },
        )
        .end(buffer);
    },
  );

  const uploadUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      imageurl: cloudinaryResult?.secure_url,
      imagePublickId: cloudinaryResult?.public_id,
    },
    omit: {
      password: true,
    },
  });

  if(currentUser?.imagePublickId && currentUser.imageurl){
    await cloudinary.uploader.destroy(currentUser.imagePublickId)
  }

  return uploadUser;
};

export const UserServices = {
  uploadProfileImage,
};
