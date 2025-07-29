import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";
import { FETCH_BUCKETLIST_VIEWS_QUERY } from "@/sanity/queries/bucketlist";
import Ping from "./Ping";

const View = async ({id}: {
    id: string
}) => {

    let {views: currentViews} = await client
    .withConfig({useCdn: false})
    .fetch(FETCH_BUCKETLIST_VIEWS_QUERY, {id});

    if(!currentViews) currentViews = 0;

    await writeClient
        .patch(id)
        .set({ views: currentViews + 1 })
        .commit();

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
                <span className="font-black">{currentViews} views</span>
            </p>
        </div>
    )
}

export default View;
