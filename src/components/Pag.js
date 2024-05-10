import Pagination from 'react-bootstrap/Pagination';

export const PagBlock = ({pag, setPage}) => {
    return (
        <Pagination className="justify-content-center">
            <Pagination.First onClick={() => setPage(1)}/>
            <Pagination.Item
                disabled={pag?.current_page === 1}
                onClick={() => setPage(pag?.previous_page)}
            >
                {
                    (pag?.current_page !== 1) ? pag?.previous_page : ""
                }
            </Pagination.Item>
            <Pagination.Item active={true}>{pag?.current_page}</Pagination.Item>
            <Pagination.Item
                disabled={pag?.current_page === pag?.max_page}
                onClick={() => setPage(pag?.next_page)}
            >
                {
                    (pag?.current_page !== pag?.next_page) ? pag?.next_page : ""
                }
            </Pagination.Item>
            <Pagination.Last onClick={() => setPage(pag?.max_page)}/>
        </Pagination>
    )
}