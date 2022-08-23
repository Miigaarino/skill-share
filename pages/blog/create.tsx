import { ChangeEvent, InputHTMLAttributes } from "react";

import { useSession } from "next-auth/react";

import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { useMutation } from "@apollo/client";

import toast from "react-hot-toast";

import { HorizontalContainer } from "components";

import {
  Mutation,
  MutationData,
  MutationVars,
} from "queries/CreateBlogMutation";
import { Query } from "queries/UserQuery";
import Router from "next/router";

function Input({
  className,
  title,
  name,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <input
        type="text"
        id={name}
        autoComplete={name}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cool-cyan focus:ring-cool-cyan sm:text-sm ${className}`}
        {...props}
        {...register(name as string, { required: true })}
      />
      {errors[name as string] && (
        <p className=" text-red-500">Заавал оруулна уу</p>
      )}
    </div>
  );
}

export default function CreateBlog() {
  const methods = useForm({
    defaultValues: {
      title: "",
      banner: "",
      content: "",
    },
  });

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = methods;

  const [createBlog, { loading }] = useMutation<MutationData, MutationVars>(
    Mutation,
    {
      refetchQueries: [Query],
      onCompleted: (data) => Router.push(`/blog/${data.createBlog.id}`),
    }
  );

  async function uploadPhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    const filename = encodeURIComponent(file?.name as string);
    try {
      const res = await fetch(`/api/upload-image?file=${filename}`);
      const data = await res.json();
      const formData = new FormData();

      Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      await toast.promise(
        fetch(data.url, {
          method: "POST",
          body: formData,
        }),
        {
          loading: "Uploading...",
          success: "Image successfully uploaded!🎉",
          error: `Upload failed 😥 Please try again`,
        }
      );
      setValue("banner", filename, { shouldDirty: true });
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit({
    title,
    banner,
    content,
  }: {
    title: string;
    banner: string;
    content: string;
  }) {
    try {
      const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${banner}`;

      toast.promise(
        createBlog({
          variables: {
            author_id: session?.user.id as string,
            banner: imageUrl,
            content,
            title,
          },
        }),
        {
          loading: "Creating...",
          success: "Blog created!🎉",
          error: `Create failed 😥 Please try again`,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="my-8">
      <HorizontalContainer>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Blog
              </h3>
              <p className="mt-1 text-sm text-gray-600">Create your own blog</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <Input name="title" title="Title" />
                    <p className="text-sm font-medium text-gray-700">Banner</p>
                    <label className="block">
                      <span className="text-gray-700">
                        Upload a .png or .jpg image (max 1MB).
                      </span>
                      <input
                        onChange={uploadPhoto}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        name="image"
                      />
                    </label>
                    <div>
                      <label
                        htmlFor="Content"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Content
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="Content"
                          rows={10}
                          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-cool-cyan focus:ring-cool-cyan sm:text-sm"
                          {...register("content", { required: true })}
                        />
                        {errors["content"] && (
                          <p className=" text-red-500">Заавал оруулна уу</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      disabled={!isDirty || loading}
                      className="inline-flex justify-center rounded-md border border-transparent bg-cool-cyan py-2 px-4 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cool-cyan focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </HorizontalContainer>
    </main>
  );
}
