import React, {Component, PropTypes} from 'react'
import MovieFolder from './MovieFolder'
import * as tb from 'tb-react'
import {configActions} from '../../actions/config'

let mb = 1024 * 1024

class SFConfigIndex extends Component {
  static contextTypes = {
      router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)

    this.providers = [
      {name: "opensubtitles", displayName: "Opensubtitles"},
      {name: "subscene", displayName: "Subscene"},
    ]
  }

  back() {
    this.context.router.goBack()
  }

  render() {
    const {
      config: {src: folders, lang: languages, providers, force, remove},
    } = this.props
    // console.log('config', this.props.config);
    const config = this.props.config

    return (
      <div className="box box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">
            <button className="btn btn-default" onClick={this.back.bind(this)}><i className="fa fa-arrow-left"></i> Back</button>
            &nbsp;
          </h3>
        </div>
        <div className="box-body">
        <div>
          <div className="row">
            <div className="col-sm-3"><strong>Movie Folders</strong></div>
            <div className="col-sm-9">
              {folders.map((folder, k) => {
                return (
                  <MovieFolder
                    src={folder}
                    key={k}
                  >
                    <tb.APIActionButton
                      name="Remove"
                      icon="trash"
                      hideName
                      type="danger"

                      action={[configActions.updateListField, 'src', folder, false]}
                    />
                  </MovieFolder>
                )
              })}
              <tb.InputTextForm
                actionFunc={(value) => [configActions.updateListField, 'src', value, true]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3"><strong>Languages</strong></div>
            <div className="col-sm-9">
              {languages.map((lang, k) => {
                return (
                  <MovieFolder
                    src={lang}
                    key={k}
                  >
                    <tb.APIActionButton
                      name="Remove"
                      icon="trash"
                      hideName
                      type="danger"

                      action={[configActions.updateListField, 'lang', lang, false]}
                    />
                  </MovieFolder>
                )
              })}

              <tb.InputTextForm
                actionFunc={(value) => [configActions.updateListField, 'lang', value, true]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3"><strong>Providers</strong></div>
            <div className="col-sm-9">
              {this.providers.map(({name: providerName, displayName}, k) => {
                let checked = providers.indexOf(providerName) >= 0
                return (
                  <div key={k}>
                    <div className="col-sm-3">{displayName}</div>
                    <div className="col-sm-9">
                      <tb.APIActionSwitch
                        checked={checked}
                        action={[configActions.updateListField, 'providers', providerName]}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3"><strong>Force download subtitle</strong></div>
            <div className="col-sm-9">
              <tb.APIActionSwitch
                checked={force}
                action={[configActions.updateField, 'force']}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <strong>Remove old subtitles if not found new subtitle</strong>
            </div>
            <div className="col-sm-9">
              <tb.APIActionSwitch
                checked={remove}
                action={[configActions.updateField, 'remove']}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <strong>Min movie size (MB)</strong>
              <div>(to ignore sample videos)</div>
            </div>
            <div className="col-sm-9">
              <tb.InputInplace
                value={config['min-movie-size'] / mb}
                actionFunc={(value) => [configActions.updateField, 'min-movie-size', Number(value) * mb]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <strong>Number subtitles</strong>
            </div>
            <div className="col-sm-9">
              <tb.InputInplace
                value={config['max-sub']}
                action={[configActions.updateField, 'max-sub']}
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

// SFConfigIndex.contextTypes = {
//     router: React.PropTypes.object
// }

export default tb.connect2({
  start: (dispatch) => {
    dispatch(configActions.load)
  },
  props: ({config}, ownProps, dispatch) => ({
    config,
  })
})(SFConfigIndex)
