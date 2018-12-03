import React from 'react'
import { Menu, Icon, Pagination} from 'semantic-ui-react';
import PropTypes from "prop-types";

export const PaginationPartial = (props) =>(
    <Menu floated='right' pagination>
        <Pagination
            onPageChange={props.onPageChange}
            ellipsisItem={null}
            defaultActivePage={props.pagination.currentPage}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={props.pagination.totalPages}
        />
    </Menu>
);

PaginationPartial.propTypes = {
    pagination:PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        totalCount: PropTypes.number.isRequired,
        hasPrevious: PropTypes.bool.isRequired,
        hasNext: PropTypes.bool.isRequired
    }).isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default PaginationPartial;