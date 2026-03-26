import PropertyDetailsOneArea from "@/components/RealEstate/PropertyDetailsOne/Details";
import Wrapper from "@/layouts/Wrapper";
import { PageParamsProps } from "@/types/custom-interface";

export const metadata = {
  title: "Property Details - PropertyLa",
};

export default async function PropertyDetails(props: PageParamsProps) {
  const resolvedParams = await props.params;
  const { id } = resolvedParams;

  return (
    <Wrapper>
      <main>
        {/* property details area start */}
        <PropertyDetailsOneArea id={id} />
        {/* property details area end */}
      </main>
    </Wrapper>
  );
}
