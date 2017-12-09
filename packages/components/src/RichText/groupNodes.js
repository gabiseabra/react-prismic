const GROUP_TYPES = [ "o-list-item", "list-item" ]

// Aggregate consecutive groupable types into arrays
export default function groupNodes(nodes) {
  const result = []
  const pushGroup = (type) => {
    const group = {
      type: `group-${type}`,
      children: []
    }
    result.push(group)
    return group
  }
  nodes.forEach((node) => {
    const { type } = node
    if(GROUP_TYPES.indexOf(type) !== -1) {
      let group = result[result.length - 1]
      if(!group || group.type !== `group-${type}`) group = pushGroup(type)
      group.children.push(node)
    } else {
      result.push(node)
    }
  })
  return result
}
