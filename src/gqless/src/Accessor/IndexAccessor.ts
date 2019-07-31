import { Selection } from '../Selection'
import { Accessor } from './Accessor'
import { ArrayNode, ScalarNode } from '../Node'
import { INDEX, IExtension } from '../Extension'

export class IndexAccessor<
  TSelectionArray extends Selection<ArrayNode<any>> = Selection<ArrayNode<any>>,
  TChildren extends Accessor = Accessor
> extends Accessor<TSelectionArray, TChildren> {
  constructor(public parent: Accessor<TSelectionArray>, public index: number) {
    super(
      parent,
      parent.selection,
      (parent instanceof IndexAccessor
        ? (parent.node as ArrayNode<any>)
        : parent.selection.node
      ).ofNode
    )

    this.stageIfRequired()
  }

  protected getExtensions() {
    super.getExtensions()

    for (const parentExtension of this.parent.extensions) {
      const extensionOfNode = parentExtension[INDEX]
      const extension: IExtension<any> =
        !(this.node instanceof ScalarNode) &&
        typeof extensionOfNode === 'function'
          ? extensionOfNode(this.data)
          : extensionOfNode
      if (!extension) continue

      this.extensions.push(extension)
    }
  }

  public get data() {
    return this.selection.node.ofNode.getData(this)
  }

  public toString() {
    return this.index
  }
}
