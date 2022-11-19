import ReactPaginate from "react-paginate";
import ArrowLeft from "../../../icons/ArrowLeft";
import React from "react";
import styled from "styled-components";
import styles from './Pagination.module.css'
import ArrowRight from "../../../icons/ArrowRight";

const ArrowPrev = styled(ArrowLeft)`
  width: 1rem;
  transform: translateY(2px);
`


const ArrowNext = styled(ArrowRight)`
  width: 1rem;
  transform: translateY(2px);
`

const Pagination = () => (
    <ReactPaginate
        containerClassName={styles.paginationWrapper}
        pageLinkClassName={styles.pageLink}
        breakClassName={styles.breakWrapper}
        nextLinkClassName={styles.linkWrapper}
        previousLinkClassName={styles.linkWrapper}
        pageCount={10}
        breakLabel="..."
        previousLabel={<ArrowPrev />}
        nextLabel={<ArrowNext/>}
    />
)

export default Pagination
