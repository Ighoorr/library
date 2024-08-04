using System;
using System.Collections.Generic;

namespace WebApi.Models;

public partial class Book
{
    public int BookId { get; set; }

    public string Title { get; set; } = null!;

    public string? Genre { get; set; }

    public int? AuthorId { get; set; }

    public virtual Author? Author { get; set; }
}
