/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';
import Text from '../../foundation/Text';

const GithubLinksWrapper = styled.div`
  max-width: 370px;
  flex: 1;
  margin: 0 12px;
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
  padding: 10px 0;
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
    avatar: 'https://avatars.githubusercontent.com/u/13791385?v=4',
    user: 'omariosouto',
    desc: 'Mario Souto',
    url: 'https://github.com/omariosouto',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/32266030?v=4',
    user: 'JulianaAmoasei',
    desc: 'Juliana Amoasei',
    url: 'https://github.com/JulianaAmoasei',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/17054729?v=4',
    user: 'juunegreiros',
    desc: 'Juliana Negreiros',
    url: 'https://github.com/juunegreiros',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/32800546?v=4',
    user: 'edukure',
    desc: 'Eduardo Tioma',
    url: 'https://github.com/edukure',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/65976843?v=4',
    user: 'carolandrade1',
    desc: 'Carol Andrade',
    url: 'https://github.com/carolandrade1',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/81654505?v=4',
    user: 'SchultzGabriel',
    desc: 'Gabriel Bridi Schultz',
    url: 'https://github.com/SchultzGabriel',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/49310817?v=4',
    user: 'milenayamamoto',
    desc: 'Milena Yamamoto',
    url: 'https://github.com/milenayamamoto',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/12902689?v=4',
    user: 'gobila',
    desc: 'Moises',
    url: 'https://github.com/gobila',
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
          Galera do Bootcamp
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
                  <img src="/images/github.svg" alt={`Repositório de ${githubLink.user}`} />
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
