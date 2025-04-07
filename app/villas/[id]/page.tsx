import VillaDescription from "@/components/VillaDescription";
import { getVillaById } from "../../../lib/repositories/villa-repo";

export default async function productDescription(
  {params} : {params : Promise<{id : string}>}
) {

  const { id } = await params;
  const villa = await getVillaById(id);

  return (
    <VillaDescription villa={villa} />
  );
}