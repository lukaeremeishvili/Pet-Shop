import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { categorySelector } from "../store/category.slice";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  deletecategoryRequest,
  editcategoryRequest,
  getCategoryRequest,
  postCategoryRequest,
} from "../store/category.thunks";
import {
  IBaseCategory,
  ICategory,
} from "../../../interfaces/category.interface";
import validateText from "../../../validations/validateText";
import validateTextarea from "../../../validations/validateTextaria";
import Input from "../../../components/Input";
import TextareaInput from "../../../components/TextareaInput";
import Form from "../../../components/Form";
import {
  loadingNotification,
  onResponseReturned,
} from "../../../utils/notifications";

interface IForm {
  categoryUuid: string | null;
}

function CategoryForm({ categoryUuid }: IForm) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { category, loading, error } = useAppSelector(categorySelector);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const [errors, setErrors] = useState<{
    title: null | string;
    description: null | string;
  }>({
    title: null,
    description: null,
  });

  useEffect(() => {
    if (categoryUuid) dispatch(getCategoryRequest(categoryUuid));
  }, [dispatch, categoryUuid]);

  const postCategory = async (category: IBaseCategory) => {
    const loadingToastId = loadingNotification();
    const res = await dispatch(postCategoryRequest(category));

    onResponseReturned(
      loadingToastId,
      () => navigate("/categories"),
      typeof res.payload === "string" ? res.payload : null
    );
  };

  const editCategory = async (category: ICategory) => {
    const loadingToastId = loadingNotification();
    const res = await dispatch(editcategoryRequest(category));

    onResponseReturned(
      loadingToastId,
      () => navigate("/categories"),
      typeof res.payload === "string" ? res.payload : null
    );
  };

  const onCategoryDelete = async (categoryUuid: string) => {
    const loadingToastId = loadingNotification();
    const res = await dispatch(deletecategoryRequest(categoryUuid));

    onResponseReturned(
      loadingToastId,
      () => navigate("/categories"),
      typeof res.payload === "string" ? res.payload : null
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleErr = validateText(
      titleRef.current ? titleRef.current.value : ""
    );
    const descriptionErr = validateTextarea(
      descriptionRef.current ? descriptionRef.current.value : ""
    );

    if (titleErr || descriptionErr)
      return setErrors({
        title: titleErr,
        description: descriptionErr,
      });

    const newCategory = {
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
    };

    if (!category) postCategory(newCategory);
    else editCategory({ ...category, ...newCategory });
  };

  return (
    <Form
      name="category"
      itemUuid={categoryUuid}
      loading={loading}
      error={error}
      onDelete={onCategoryDelete}
      onSubmit={onSubmit}
    >
      <div>
        <div>
          <Input
            name="title"
            inputRef={titleRef}
            defaultValue={category?.title || ""}
            error={errors.title}
          />
          <TextareaInput
            name="description"
            defaultValue={category?.description || ""}
            textareaRef={descriptionRef}
            error={errors.description}
          />
        </div>
      </div>
    </Form>
  );
}

export default CategoryForm;
