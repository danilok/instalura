/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';
import Text from '../../foundation/Text';

const GithubLinksWrapper = styled.div`
  max-width: 370px;
`;

GithubLinksWrapper.List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

GithubLinksWrapper.Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

GithubLinksWrapper.LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

GithubLinksWrapper.Avatar = styled.img`
  width: ${({ size }) => ((size) ? `${size}px` : '48px')};
  height: ${({ size }) => ((size) ? `${size}px` : '48px')};
  border-radius: 50%;
`;

GithubLinksWrapper.Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 16px;
`;

GithubLinksWrapper.Repo = styled.div`
  a {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 85px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.secondary.main.color};
  }
`;

const githubLinks = [
  {
    avatar: '/images/image.svg',
    user: 'user1',
    desc: 'user1',
    url: 'https://github.com',
  },
  {
    avatar: '/images/image.svg',
    user: 'user2',
    desc: 'user2',
    url: 'https://github.com',
  },
];

export default function GithubLinks() {
  return (
    <GithubLinksWrapper>
      <GithubLinksWrapper.Item>
        <GithubLinksWrapper.LeftSide>
          <GithubLinksWrapper.Avatar
            src="https://avatars.githubusercontent.com/u/624381?v=4"
            alt="danilok"
            size="64"
          />
          <GithubLinksWrapper.Info>
            <Text
              tag="span"
              variant="paragraph2"
              color="tertiary.main"
            >
              danilok
            </Text>
            <Text
              tag="span"
              variant="paragraph1"
              color="tertiary.light"
            >
              Danilo Yorinori
            </Text>
          </GithubLinksWrapper.Info>
        </GithubLinksWrapper.LeftSide>
        <GithubLinksWrapper.Repo>
          <a href="https://github.com/danilok">
            <img src="/images/github.svg" alt="github" />
            <span>Github</span>
          </a>
        </GithubLinksWrapper.Repo>
      </GithubLinksWrapper.Item>
      <div>
        <Text
          tag="p"
          variant="paragraph1"
          color="tertiary.light"
        >
          Projetos da galera
        </Text>
      </div>
      <GithubLinksWrapper.List>
        {githubLinks.map((githubLink) => (
          <li key={`_user-${githubLink.user}`}>
            <GithubLinksWrapper.Item>
              <GithubLinksWrapper.LeftSide>
                <GithubLinksWrapper.Avatar src={githubLink.avatar} alt="aaa" />
                <GithubLinksWrapper.Info>
                  <Text
                    tag="span"
                    variant="paragraph2"
                    color="tertiary.main"
                  >
                    {githubLink.user}
                  </Text>
                  <Text
                    tag="span"
                    variant="paragraph1"
                    color="tertiary.light"
                  >
                    {githubLink.desc}
                  </Text>
                </GithubLinksWrapper.Info>
              </GithubLinksWrapper.LeftSide>
              <GithubLinksWrapper.Repo>
                <a href={githubLink.url}>
                  <img src="/images/github.svg" alt="github" />
                  <span>Github</span>
                </a>
              </GithubLinksWrapper.Repo>
            </GithubLinksWrapper.Item>
          </li>
        ))}
      </GithubLinksWrapper.List>
    </GithubLinksWrapper>
  );
}
