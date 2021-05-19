import React,{Component} from 'react';
import _ from 'lodash';

class TableBody extends Component {

//     var object = { 'a': [{ 'b': { 'c': 3 } }] };
//
//     _.get(object, 'a[0].b.c');
//      // => 3
//
//     _.get(object, ['a', '0', 'b', 'c']);
//      // => 3
//
//     _.get(object, 'a.b.c', 'default');
//       // => 'default'


    renderCell =(item,column)=>{
        if(column.content) return column.content(item);
        return _.get(item , column.path);
    }



    //columns->colum
    //
    // content: ƒ content() {}
    // label: "Title"
    // path: "title"

    //data->item
    //
    // _id: "5b21ca3eeb7f6fbccd47181a"
    // dailyRentalRate: 3.5
    // genre: {_id: "5b21ca3eeb7f6fbccd471814", name: "Comedy"}
    // numberInStock: 7
    // title: "Airplane"
    // new entry: ""





    render(){
        const {data,columns} =this.props;

        return(
            <tbody>
            {data.map(item => <tr key={item._id} >
                    {columns.map(column=><td key={item._id + column.path ||column.key}>{this.renderCell(item,column)}</td>)}
                </tr>)}
            </tbody>);
    }
}

export default TableBody;