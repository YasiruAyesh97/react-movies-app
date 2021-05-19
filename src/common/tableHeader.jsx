import React,{ Component} from 'react';

//colum :array
//sortColum :onject
//onSort :function
class TableHeader extends Component {

    raiseSort =(path) =>{
        const sortColumn ={...this.props.sortColumn};


        if(sortColumn.path ===path)
            sortColumn.order =(sortColumn.order ==='asc') ?'desc':'asc';
        else{
            sortColumn.path =path;
            sortColumn.order ='asc';
        }
        this.props.onSort(sortColumn);

    }
    renderSortIcon =(column)=>{
        if(column.path !== this.props.sortColumn.path) return null;
        if(this.props.sortColumn.order ==='asc') return <i className="fa fa-sort-asc"/>;
        return <i className="fa fa-sort-desc"/>;
    }

    render() {
        return (
            <thead>
            <tr>
                {this.props.colums.map(c =>
                    <th
                        key={c.path ||c.key}
                        onClick ={()=>this.raiseSort(c.path)}
                    >
                        {c.label}{this.renderSortIcon(c)}
                    </th>
                )
                }
            </tr>
            </thead>
        );
    }
}
export default TableHeader;