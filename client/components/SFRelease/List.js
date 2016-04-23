import React from 'react'
import { Link } from 'react-router'
import RestService from '../RestService'

export default class SFReleaseList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {data: [], current: null, connectionError: false, loading: false}
  }

  componentWillMount() {
    this.loadData()
  }

  async loadData() {
    try {
      this.setState({loading: true})

      let data = await RestService.load('release')
      console.log(data)

      this.setState({data: data, connectionError: false, loading: false})
    } catch (promise) {
//      console.log('error', promise)
      this.setState({connectionError: true, loading: false})
    }
  }

  async downloadRelease(release_name) {
    console.log('download release', release_name);
  }

  render() {
    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">SFReleaseList Title</h3>

          <div className="box-tools">
            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="box-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map((item, k) => {
            return (
              <tr key={k}>
                <td>
                    {item.name}
                </td>
                <td>
                    <button className="btn btn-default" onClick={() => this.downloadRelease(item.name)}>Download</button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}
