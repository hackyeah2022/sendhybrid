import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {fetchSingleReport, getSingleReportQueryKey} from "../hooks/useSingleReport";

const singleReportGetServerSideProps = async (
    {params: {reportId}}: GetServerSidePropsContext
): GetServerSidePropsResult<any> => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(getSingleReportQueryKey(reportId), () => fetchSingleReport(reportId))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default singleReportGetServerSideProps
