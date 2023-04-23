import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Movies } from "../../types/Movies";

interface Props {
  movies?: Movies;
}

interface SaveParams {
  values: Movies;
}

interface DeleteParams {
  id: string;
}

const saveMovies = async ({ values }: SaveParams) =>
  await fetch<Movies>(!values["@id"] ? "/movies" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteMovies = async (id: string) =>
  await fetch<Movies>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ movies }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Movies> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveMovies(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Movies> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteMovies(id), {
    onSuccess: () => {
      router.push("/moviess");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!movies || !movies["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: movies["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/moviess"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {movies ? `Edit Movies ${movies["@id"]}` : `Create Movies`}
      </h1>
      <Formik
        initialValues={
          movies
            ? {
                ...movies,
              }
            : new Movies()
        }
        validate={() => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          saveMutation.mutate(
            { values },
            {
              onSuccess: () => {
                setStatus({
                  isValid: true,
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
                });
                router.push("/movies");
              },
              onError: (error) => {
                setStatus({
                  isValid: false,
                  msg: `${error.message}`,
                });
                if ("fields" in error) {
                  setErrors(error.fields);
                }
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="shadow-md p-4" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="movies_title"
              >
                title
              </label>
              <input
                name="title"
                id="movies_title"
                value={values.title ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.title && touched.title ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.title && touched.title ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="title"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="movies_rentalRate"
              >
                rentalRate
              </label>
              <input
                name="rentalRate"
                id="movies_rentalRate"
                value={values.rentalRate ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.rentalRate && touched.rentalRate
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.rentalRate && touched.rentalRate ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="rentalRate"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="movies_rating"
              >
                rating
              </label>
              <input
                name="rating"
                id="movies_rating"
                value={values.rating ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.rating && touched.rating ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.rating && touched.rating ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="rating"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="movies_category"
              >
                category
              </label>
              <input
                name="category"
                id="movies_category"
                value={values.category ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.category && touched.category ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.category && touched.category ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="category"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="movies_rental"
              >
                rental
              </label>
              <input
                name="rental"
                id="movies_rental"
                value={values.rental ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.rental && touched.rental ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.rental && touched.rental ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="rental"
              />
            </div>
            {status && status.msg && (
              <div
                className={`border px-4 py-3 my-4 rounded ${
                  status.isValid
                    ? "text-cyan-700 border-cyan-500 bg-cyan-200/50"
                    : "text-red-700 border-red-400 bg-red-100"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <button
              type="submit"
              className="inline-block mt-2 bg-cyan-500 hover:bg-cyan-700 text-sm text-white font-bold py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <div className="flex space-x-2 mt-4 justify-end">
        {movies && (
          <button
            className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-sm text-red-400 font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
