const MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left',
};

const MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top',
};

const parseStringPair = (value) => {
  const [vertical, horizontal] = value.split(' ');
  return { vertical, horizontal };
};

const isVerticalAttachment = attachment => (attachment.vertical !== 'middle');

const primaryArrowPosition = attachment => (isVerticalAttachment(attachment) ? attachment.vertical : attachment.horizontal);

const mirrorAttachment = (attachment) => {
  const parsedValue = parseStringPair(attachment);
  let horizontal = parsedValue.horizontal;
  let vertical = parsedValue.vertical;

  if (isVerticalAttachment(parsedValue.vertical)) {
    vertical = MIRROR_TB[parsedValue.vertical];
  } else {
    horizontal = MIRROR_LR[parsedValue.horizontal];
  }

  return `${vertical} ${horizontal}`;
};

const getContentOffset = (attachment, targetNode, arrowOffset) => {
  const offset = { vertical: 0, horizontal: 0 };
  if (targetNode) {
    if (isVerticalAttachment(attachment) && targetNode.clientWidth <= arrowOffset * 2) {
      if (attachment.horizontal === 'left') {
        offset.horizontal = arrowOffset - (targetNode.clientWidth / 2);
      } else if (attachment.horizontal === 'right') {
        offset.horizontal = -(arrowOffset - (targetNode.clientWidth / 2));
      }
    }
  }
  return offset;
};

const arrowPositionFromBounds = (targetBounds, contentBounds, isVertical, arrowOffset) => {
  if (isVertical) {
    if ((contentBounds.left + contentBounds.width) - arrowOffset >= targetBounds.left && contentBounds.left + arrowOffset <= targetBounds.left + targetBounds.width) {
      if (targetBounds.top < contentBounds.top) {
        return 'top';
      } else if (targetBounds.bottom < contentBounds.bottom) {
        return 'bottom';
      }
    }
  } else if ((contentBounds.top + contentBounds.height) - arrowOffset >= targetBounds.top && contentBounds.top + arrowOffset <= targetBounds.top + targetBounds.height) {
    if (targetBounds.left < contentBounds.left) {
      return 'left';
    } else if (targetBounds.right < contentBounds.right) {
      return 'right';
    }
  }
  return undefined;
};

const leftOffset = (targetBounds, contentBounds, arrowOffset, contentOffset, attachment) => {
  let offset;
  if (contentOffset.horizontal !== 0 || attachment.horizontal === 'center') {
    offset = (targetBounds.left - contentBounds.left) + arrowOffset + (targetBounds.width / 2);
  } else if (attachment.horizontal === 'right') {
    offset = (targetBounds.left - contentBounds.left) + targetBounds.width;
  } else {
    offset = (targetBounds.left - contentBounds.left) + (2 * arrowOffset);
  }

  if (offset < 2 * arrowOffset) {
    offset = 2 * arrowOffset;
  } else if (offset > contentBounds.width) {
    offset = contentBounds.width;
  }
  return `${offset}px`;
};

const topOffset = (targetBounds, contentBounds, arrowOffset) => {
  let offset = (targetBounds.top - contentBounds.top) + arrowOffset + (targetBounds.height / 2);
  if (offset < 2 * arrowOffset) {
    offset = 2 * arrowOffset;
  } else if (offset > contentBounds.height) {
    offset = contentBounds.height;
  }
  return (`${offset}px`);
};

export { parseStringPair, isVerticalAttachment, primaryArrowPosition, mirrorAttachment, getContentOffset, arrowPositionFromBounds, leftOffset, topOffset };
