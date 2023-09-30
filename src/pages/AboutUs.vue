<template>
  <q-page class="q-px-xl">
    <h1>Builder Materials Market - Online Store for Construction Materials</h1>
    <hr>

    <p>
      Welcome to the Builder Materials Market, your one-stop online shop for
      construction materials. This README.md file provides essential information
      to get you started with our application.
    </p>

    <h2>Table of Contents</h2>
    <hr>

    <ul>
      <li><a href="#introduction">Introduction</a></li>
      <li><a href="#environment-variables">Environment Variables</a></li>
      <li><a href="#npm-scripts">npm Scripts</a></li>
      <li><a href="#getting_started">Getting Started</a></li>
      <li><a href="#current_state">Current State</a></li>
      <li><a href="#contact_us">Contact Us</a></li>
    </ul>

    <section id="introduction">
      <h2>
        Introduction
      </h2>
      <hr>

      <p>
        Builder Materials Market is an online store for construction materials.
        This application is designed to provide a convenient platform for
        customers to browse and purchase various construction supplies. Below, you
        will find information on setting up and running the application.
      </p>
    </section>

    <section id="environment-variables">
      <h2>
        Environment Variables
      </h2>
      <hr>

      <p>
        Before running the application, make sure to set up the following
        environment variables. These variables are essential for configuring the
        application properly.
      </p>

      <pre>
          <code>
      SERVER_PORT=8080

      DOCKER_CONTAINER_NAME=builder_materials_market

      ORACLE_SID=bmm
      ORACLE_PDB=builder_materials_market
      ORACLE_PWD=pwd
      ORACLE_PORT=1521
      ORACLE_EDITION=enterprise
      ORACLE_USER=builder_materials_market
      ORACLE_CONN_STRING=localhost:1521/blackmarllbor0

      TOKEN_LIVE_TIME_IN_HOURS=10
      TOKEN_SECRET=auevoramjizn
          </code>
      </pre>
    </section>

    <section id="introduction">
      <h2>
        npm Scripts
      </h2>
      <hr>

      <p>
        We have included several npm scripts to help you manage the application.
        Here are the available scripts and their descriptions:
      </p>

      <ul>
        <li>
          <pre class="tight-pre"><code>npm start</code></pre>
          <span>: Build the application and start the server.</span>
        </li>
        <li>
          <pre class="tight-pre"><code>npm run dev</code></pre>
          <span>: Run the application in development mode with hot-reloading.</span>
        </li>
        <li>
          <pre class="tight-pre"><code>npm run debug</code></pre>
          <span>: Run the application in debug mode.</span>
        </li>
        <li>
          <pre class="tight-pre"><code>npm run build</code></pre>
          <span>: Compile TypeScript code.</span>
        </li>
        <li>
          <pre class="tight-pre"><code>npm run up_db</code></pre>
          <span>: Start the Docker container for the database.</span>
        </li>
        <li>
          <pre class="tight-pre"><code>npm run migrate_up</code></pre>
          <span>: Run database migrations to the latest version.</span>
        </li>
        <li>
          <pre class="tight-pre"><code>npm run migrate_down</code></pre>
          <span>: Rollback the latest database migration.</span>
        </li>
        <li>
          <pre class="tight-pre"><code>npm run lint</code></pre>
          <span>: Run ESLint for code linting.</span>
        </li>
        <li>
          <pre class="tight-pre"><code>npm run format</code></pre>
          <span>: Format code using Prettier.</span>
        </li>
        <li>
          <pre class="tight-pre"><code>npm run gen:spec</code></pre>
          <span>
            : Generate a single OpenAPI specification file from multiple YAML
            files.
          </span>
        </li>
      </ul>
    </section>

    <section id="getting_started">
      <h2>
        Getting Started
      </h2>
      <hr>

      <p>
        To get started with the Builder Materials Market application, follow these
        steps:
      </p>

      <ul>
        <li class="numbered-list">
          <span>Clone the repository to your local machine.</span>
          <br>
          <pre
            class="tight-pre"
          ><code>git clone https://github.com/blackmarllbor0/building-materials-market-API.git</code>
        </pre>
        </li>
        <li class="numbered-list">
          <span>Install all dependencies.</span>
          <br>
          <pre class="tight-pre"><code>npm install</code></pre>
        </li>
        <li class="numbered-list">
          <span>
            Configure the necessary environment variables in the .env file as
            mentioned in the previous section.
          </span>
        </li>
        <li class="numbered-list">
          <span>
            If you've made changes to the OpenAPI specification in YAML files,
            compile them into a single file using the following command:
          </span>
          <br>
          <pre class="tight-pre"><code>npm run gen:spec</code></pre>
        </li>
        <li class="numbered-list">
          <span>Start the application:</span>
          <br>
          <pre class="tight-pre"><code>npm start</code></pre>
        </li>
      </ul>

      <p>
        Your Builder Materials Market online store should now be up and running.
      </p>
    </section>

    <section id="current_state">
      <h2>
        Current State
      </h2>
      <hr>

      <p>
        Please note that the application is currently in development, and further
        updates and improvements will be made. Don't forget to check for updates
        and ensure that you have the latest dependencies installed.
      </p>

      <p>
        Thank you for choosing Builder Materials Market for your construction
        material needs! If you have any questions or encounter any issues, please
        feel free to reach out to us.
      </p>

      <p>Happy shopping!</p>
    </section>

    <section id="contact_us">
      <h2>
        Contact Us
      </h2>
      <hr>

      <p>
        If you have any questions, suggestions, or encounter any issues, please
        feel free to reach out to us:
      </p>

      <ul>
        <li>
          <span>Telegram:
            <a
              href="https://t.me/blackmarllbor0"
              class="contacts"
              target="_blank"
            >@blackmarllbor0</a></span>
        </li>
        <li>
          <span>Email:
            <a
              href="https://3100194@gmail.com"
              class="contacts"
              target="_blank"
            >3100194@gmail.com</a></span>
        </li>
      </ul>

      <p>
        Thank you for choosing Builder Materials Market for your construction
        material needs! Happy shopping!
      </p>
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutUsPage',
});
</script>

<style lang="scss" scoped>
@import '../css/quasar.variables.scss';
@import '../css/app.scss';

h1 {
  font-size: 50px;
}

h2 {
  font-size: 40px;
  display: flex;
  flex-direction: column;
}

hr {
  margin: 15px;
}

p,
code {
  font-size: 25px;
}

pre {
  background-color: #d7d7d7;
  padding: 0px;
  border: 1px solid #ddd;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 15px;

  &.tight-pre {
    display: inline-block;
    padding: 2px 10px;
    margin: 0;
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
    border-radius: 10px;
  }
}

code {
  color: #333;
}

li {
  list-style-type: disc;
  margin: 5px 0;

  &.numbered-list {
    list-style: decimal;
    margin-bottom: 25px;

    pre {
      margin-top: 15px;
    }
  }

  p,
  span {
    vertical-align: middle;
  }

  p {
    font-size: 25px;
  }

  a {
    @include middle-underline(25px, #0000a3, $main-red-color, $transition);

    &.contacts {
      font-size: 20px;
    }

    &:hover {
      color: black;
    }
  }

  span {
    font-size: 25px;
    vertical-align: middle;
  }
}
</style>
