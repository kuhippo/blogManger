import React, { PropTypes } from 'react';
import BlogsModal from './BlogsModal';
import BlogsList from './BlogsList';
import BlogsFilter from './BlogsFilter';
import { connect } from 'dva';

function Blogs({ location, blogs, dispatch }) {
    const { list, pagination, currentItem, modalVisible, modalType, isMotion } = blogs
    const { field, keyword } = location.query
    const blogsModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: false,
        onOk(data) {
            dispatch({
                type: `blogs/${modalType}`,
                payload: data,
            })
        },
        onCancel() {
            dispatch({
                type: 'blogs/hideModal',
            })
        },
    }

    const blogsFilterProps = {
        field,
        keyword,
        onSearch(fieldsValue) {
            fieldsValue.keyword.length ? dispatch(routerRedux.push({
                pathname: '/users',
                query: {
                    field: fieldsValue.field,
                    keyword: fieldsValue.keyword,
                },
            })) : dispatch(routerRedux.push({
                pathname: '/users',
            }))
        },
        onAdd() {
            dispatch({
                type: 'blogs/showModal',
                payload: {
                    modalType: 'create',
                },
            })
        },
    }

    const blogsListProps = {
        dataSource: list,
        loading: false,
        pagination,
        location,
        isMotion,
        onPageChange(page) {
            // const { query, pathname } = location
            // dispatch(routerRedux.push({
            //     pathname,
            //     query: {
            //         ...query,
            //         page: page.current,
            //         pageSize: page.pageSize,
            //     },
            // }))
        },
        onDeleteItem(id) {
            dispatch({
                type: 'blogs/delete',
                payload: id,
            })
        },
        onEditItem(item) {
            dispatch({
                type: 'blogs/showModal',
                payload: {
                    modalType: 'update',
                    currentItem: item,
                },
            });
        },
    };

    const BlogsModalGen = () => (<BlogsModal {...blogsModalProps} />)
    return (
        <div className="content-inner">
            <BlogsFilter {...blogsFilterProps} />
            <BlogsList {...blogsListProps} />
            <BlogsModalGen />
        </div>
    )
}

Blogs.PropTypes = {
    blogs: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
}


export default connect(({ blogs, loading }) => ({ blogs }))(Blogs)