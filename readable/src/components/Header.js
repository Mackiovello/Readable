import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Header({ categories, thin, headerText }) {
  return (
    <div>
      {thin
        ? <ThinHeader>
            <Headline>
              {headerText}
            </Headline>
          </ThinHeader>
        : <FatHeader>
            <Headline>
              <HeadlineLink to="/">Readable</HeadlineLink>
            </Headline>
            <Navigation>
              <NavigationLink to="/">all</NavigationLink>
              {categories.map(category =>
                <NavigationLink to={`/${category.path}`} key={category.name}>
                  {category.name}
                </NavigationLink>
              )}
            </Navigation>
          </FatHeader>}
    </div>
  );
}

const ThinHeader = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding-top: 15px;
  background-color: var(--primary-color);
  box-shadow: 0 1px 3px #999;
`;

const FatHeader = styled.div`
  width: 100vw;
  height: 130px;
  padding-top: 15px;
  background-color: var(--primary-color);
  box-shadow: 0 1px 3px #999;
`;

const Headline = styled.h1`
  text-align: center;
  font-weight: lighter;
  margin-top: 0;
`;

const HeadlineLink = styled(Link)`
  text-decoration: none;
  color: #333;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
`;

const NavigationLink = styled(Link)`
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 1px 4px #666;
  border-radius: 4px;
  padding: 8px 4px;
  margin: 3px;
  width: 65px;
  text-align: center;
  color: #333;
  text-decoration: none;
`;

export default connect(({ categories }) => ({ categories }))(Header);
