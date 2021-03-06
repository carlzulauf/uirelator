FROM ruby:3.0.2

# install yarn repository
RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y nodejs yarn rsync libpq-dev

WORKDIR /app

# install gems on their own, to speedup rebuilds
COPY Gemfile* /app/
RUN gem install bundler -v 2.2.22 \
 && bundle config set deployment 'true' \
 && bundle config set without 'development test' \
 && bundle install

# install node_modules on their own, to speedup rebuilds
COPY package.json yarn.lock /app/
RUN yarn install

# every file change triggers this step and below to repeat
#  so, try to do as much above here as possible
COPY . /app

ENV RAILS_ENV=production
ENV SECRET_KEY_BASE=placeholder
RUN bundle exec rails assets:precompile
CMD bundle exec rails server
