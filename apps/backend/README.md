## Note

Remember to use `black` and `isort` to format Python files into a standard
format:

Using `black`

```bash
black .
```

Using `isort`

```bash
isort .
```


## Resetting the build

```bash
docker-compose up -d --no-deps --build <service-name>