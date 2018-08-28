## Documentation

The image module serves all image related content in a standardized matter. Its smallest item is the `image`, followed by an `picture` and then by an `figure` element. It is recommended to always use an `figure` element in order to provide best SEO predictability and results.

### Image

A `image` is the smallest element and serves the final image, there for it uses an image source path and an alternative title if the source path may be broken.

    {{> @image image-source="my/file/source/path.jpg" image-alt="Lorem ipsum"}}

### Picture

The `picture` is in the middle, wraps a `image` and adds different viewport sources to it. This is supported by every major browsers and adds very important performance boosts to responsive designs. Also a `picture` will be the best place to add the title tag.

    {{> @picture picture-title="Lorem ipsum" image-source="my/file/source/path.jpg" image-alt="Lorem ipsum"}}

### Figure

At last the `figure` can wrap every `picture` and `image`. It is always recommended to use a `figure` because of its `figcaption` ability. This `figcaption` offer you a way to place an description text right beside your image. And this will boost the SEO because every crawler now can fetch the context of the description to the given image.

    {{> @figure figure-caption="Lorem ipsum dolores" picture-title="Lorem ipsum" image-source="my/file/source/path.jpg" image-alt="Lorem ipsum"}}

### Configuration

Please use a YML configuration in order to enjoy the full setup power. Take a look on the examples.