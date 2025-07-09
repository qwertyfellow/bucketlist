import { auth } from "@/auth";
import { createOrUpdateCreator } from "@/lib/actions/creator/createOrUpdateCreator";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams?: { [key: string]: string | undefined };
};

export default async function Page({ searchParams }: PageProps) {
  const session = await auth();
  const source = searchParams?.source;

  if (!session?.user?.email) {
    redirect("/creators/join");
  }

  const accountId = session?.accountId as string;
  const userId = session?.user?.id as string;
  const email = session?.user?.email;
  const name = session?.user?.name || "Unnamed";
  const image = session?.user?.image;

  if (source === "creator-join") {
    await createOrUpdateCreator({
      _id: userId,
      name,
      email,
      image,
      accountId
    });
  }

  redirect(`/creators/profile/${userId}`);
}
