export default async function catchAllPage({
    params
} : {
    params : Promise<{ids : number[]}>,
}) {

    const {ids} = await params;

    return (
        <div>
            <h1>Ids {ids}</h1>
        </div>
    )
}