# Node.JS express codegen #

import click


@click.command()
@click.argument('specification', type=click.File('rb'), metavar='<specification>')
@click.argument('template', type=click.File('rb'), metavar='<template>')
@click.option('-o', '--output', type=click.File('wb'), help="File location for generated NodeJS code. Defaults to current working directory")
def main(input, output):
    """Take a v3 openAPI specification YAML file <specification> and generate code based on the given template file <template>."""
    pass



if __name__ == '__main__':
    main()
