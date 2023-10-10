import { useRouter } from "next/router";
import Link from "next/link";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";
import useSWR from "swr";
import { useState } from "react";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error, mutate } = useSWR(`/api/places/${id}`);
  const [isEditMode, setIsEditMode] = useState(false);

  async function editPlace(place) {
    console.log(place);
    const response = await fetch(`/api/places/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });
    if (response.ok) {
      mutate();
      router.push("/");
      setIsEditMode(false);
    } else {
      console.log(`Error : ${response.status}`);
    }
    console.log("Place edited (but not really...)");
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onSubmit={editPlace}
        formName={"edit-place"}
        defaultData={place}
      />
    </>
  );
}
