export default async function optionalCatchAllPage({
    params
} : {
    params : Promise<{optional_ids : number[]}>,
}) {

    const {optional_ids} = await params;

    return (
        <div>
            <h1>optional Ids {optional_ids}</h1>
        </div>
    )
}

