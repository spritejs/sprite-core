import Group from './group'
import attr from '../lib/attr'
import {registerNodeType} from './nodetype'

class LayoutAttr extends Group.Attr {
  constructor(subject) {
    super(subject)
    this.setDefault({

    })
  }

  @attr
  set direction(value) {
    this.clearCache()
    this.set('direction', value)
  }
}

class Layout extends Group {
  static Attr = LayoutAttr

  render(t, drawingContext) {
    return super.render(t, drawingContext)
  }
}

registerNodeType('layout', Group, true)

export default Layout
