/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function PostCard() {
  return (
    <div>
      <div>
        <span>user</span>
        <button type="button">opções</button>
      </div>
      <div>
        <figure>
          <img src="/images/image.svg" alt="img" />
        </figure>
        <div>
          <button type="button">Likes</button>
        </div>
        <div>
          <div>likers</div>
          <span>description...</span>
          <button type="button">options</button>
        </div>
      </div>
    </div>
  );
}
