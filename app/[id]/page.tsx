export default async function idPage({
    params,
    // searchParams
} : {
    params : Promise<{id : string}>,
    // searchParams : Promise<{[key : string] : string | string[] | undefined}>
}) {

    const {id} = await params;
    // const { page = '1', sort = 'asc', query = '' } = await searchParams

    return (
        <div>
            <h1>Product Listing Id {id}</h1>
            {/* <p>Search query: {query}</p>
            <p>Current page: {page}</p>
            <p>Sort order: {sort}</p> */}
        </div>
    )
}

