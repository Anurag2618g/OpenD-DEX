import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import Principal from "mo:base/Principal";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft/index";

function Item(props) {

  const [ name , setName ] = useState();
  const [ owner , setOwner] = useState();
  const [ image , setImage ] = useState();

  const id = props.id;

  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({localHost});
  
  async function loadNFT() {
    const NFTActor = new Actor.createActor(idlFactory , {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();
    const imgData = await NFTActor.getAsset();
    const imgContent = new Uint8Array(imgData);
    const image = URL.createObjectURL(
      new Blob([imgContent.buffer], { type: "image/png" } )
    );

    setName(name);
    setOwner(owner.toText());
    setImage(image);
  }

  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
