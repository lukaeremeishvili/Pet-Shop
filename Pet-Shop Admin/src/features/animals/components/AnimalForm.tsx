import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import TextareaInput from "../../../components/TextareaInput";
import validateText from "../../../validations/validateText";
import validateNumber from "../../../validations/validateNumber";
import validateTextarea from "../../../validations/validateTextaria";
import useAppSelector from "../../../hooks/useAppSelector";
import { animalSelector } from "../store/animal.slice";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  deleteAnimalRequest,
  editAnimalRequest,
  getAnimalRequest,
  postAnimalRequest,
} from "../store/animal.thunks";
import { IAnimal, IBaseAnimal } from "../../../interfaces/animal.interface";
import CheckboxInput from "./CheckboxInput";
import Form from "../../../components/Form";
import styled from "styled-components";
import {
  loadingNotification,
  onResponseReturned,
} from "../../../utils/notifications";

const FormInputs = styled.div`
  &:first-child {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
`;

interface IForm {
  animalUuid: string | null;
}

function AnimalForm({ animalUuid }: IForm) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { animal, loading, error } = useAppSelector(animalSelector);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const stockRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [isPopular, setIsPopular] = useState(false);

  const [errors, setErrors] = useState<{
    name: null | string;
    description: null | string;
    stock: null | string;
    price: null | string;
    image: null | string;
  }>({
    name: null,
    description: null,
    stock: null,
    price: null,
    image: null,
  });

  useEffect(() => {
    if (animal) setIsPopular(animal.isPopular);
  }, [animal]);

  useEffect(() => {
    if (animalUuid) dispatch(getAnimalRequest(animalUuid));
  }, [dispatch, animalUuid]);

  const postAnimal = async (animal: IBaseAnimal) => {
    const loadingToastId = loadingNotification();
    const res = await dispatch(postAnimalRequest(animal));

    onResponseReturned(
      loadingToastId,
      () => navigate("/animals"),
      typeof res.payload === "string" ? res.payload : null
    );
  };

  const editAnimal = async (animal: IAnimal) => {
    const loadingToastId = loadingNotification();
    const res = await dispatch(editAnimalRequest(animal));

    onResponseReturned(
      loadingToastId,
      () => navigate("/animals"),
      typeof res.payload === "string" ? res.payload : null
    );
  };

  const onAnimalDelete = async (animalUuid: string) => {
    const loadingToastId = loadingNotification();
    const res = await dispatch(deleteAnimalRequest(animalUuid));

    onResponseReturned(
      loadingToastId,
      () => navigate("/animals"),
      typeof res.payload === "string" ? res.payload : null
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameErr = validateText(nameRef.current ? nameRef.current.value : "");
    const descriptionErr = validateTextarea(
      descriptionRef.current ? descriptionRef.current.value : ""
    );
    const priceErr = validateNumber(
      priceRef.current ? +priceRef.current.value : ""
    );
    const stockErr = validateNumber(
      stockRef.current ? +stockRef.current.value : ""
    );
    const imageErr = validateText(
      imageRef.current ? imageRef.current.value : ""
    );

    if (nameErr || descriptionErr || priceErr || stockErr || imageErr)
      return setErrors({
        name: nameErr,
        description: descriptionErr,
        price: priceErr,
        stock: stockErr,
        image: imageErr,
      });

    const newAnimal = {
      name: nameRef.current!.value,
      description: descriptionRef.current!.value,
      price: +priceRef.current!.value,
      isPopular: isPopular,
      stock: +stockRef.current!.value,
      image: imageRef.current!.value,
    };

    if (!animal) postAnimal(newAnimal);
    else editAnimal({ ...animal, ...newAnimal });
  };

  return (
    <Form
      name="pet"
      itemUuid={animalUuid}
      loading={loading}
      error={error}
      onDelete={onAnimalDelete}
      onSubmit={onSubmit}
    >
      <FormInputs>
        <div>
          <Input
            name="name"
            inputRef={nameRef}
            defaultValue={animal?.name || ""}
            error={errors.name}
          />
          <Input
            name="price"
            type="number"
            inputRef={priceRef}
            defaultValue={String(animal?.price || "")}
            error={errors.price}
          />
          <Input
            name="stock"
            type="number"
            inputRef={stockRef}
            defaultValue={String(animal?.stock || "")}
            error={errors.stock}
          />
          <Input
            name="image"
            inputRef={imageRef}
            defaultValue={String(animal?.image || "")}
            error={errors.image}
          />
        </div>

        <div>
          <TextareaInput
            name="description"
            defaultValue={animal?.description || ""}
            textareaRef={descriptionRef}
            error={errors.description}
          />
          <CheckboxInput
            name="popular"
            checked={isPopular}
            onChange={() => setIsPopular((prev) => !prev)}
          />
        </div>
      </FormInputs>
    </Form>
  );
}

export default AnimalForm;
