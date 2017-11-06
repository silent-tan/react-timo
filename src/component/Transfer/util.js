import React from 'react';

export function defaultRenderItem(item) {
  return (
    <div className="nf-transfer-item-render">
      {`${item._transfer_id} ${item._transfer_value}`}
    </div>
  );
}