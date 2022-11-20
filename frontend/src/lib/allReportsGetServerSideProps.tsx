import {GetServerSidePropsResult} from "next";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {fetchAllReports, getAllReportsQueryKey} from "../hooks/useAllReports";

const allReportsGetServerSideProps = async (): GetServerSidePropsResult<any> => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(getAllReportsQueryKey(), () => fetchAllReports())

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default allReportsGetServerSideProps
