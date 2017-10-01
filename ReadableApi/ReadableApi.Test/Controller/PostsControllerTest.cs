using Microsoft.AspNetCore.Mvc;
using Moq;
using Moq.Language;
using Moq.Language.Flow;
using ReadableApi.Controllers;
using ReadableApi.Models;
using ReadableApi.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using Xunit;

namespace ReadableApi.Test.Controller
{
    public class PostsControllerTest
    {
        [Fact]
        public void GettingAll_FromMockRepostory_ReturnsAll()
        {
            // Arrange
            IEnumerable<InMemoryPost> allObjects = new InMemoryPost[]
            {
                new InMemoryPost(),
                new InMemoryPost()
            };

            var repoMock = new Mock<IRepository<InMemoryPost>>();
            repoMock.Setup(s => s.GetAll()).Returns(allObjects);
            var controller = new PostsController(repoMock.Object);

            // Act
            var result = controller.GetAll() as OkObjectResult;

            // Assert
            Assert.Equal(allObjects, result.Value);
        }


        [Fact]
        public void GettingAll_FromEmptyMockRepository_ReturnsEmptySequence()
        {
            // Arrange
            IEnumerable<InMemoryPost> emptySequence = new InMemoryPost[0];
            var repoMock = new Mock<IRepository<InMemoryPost>>();
            repoMock.Setup(s => s.GetAll()).Returns(new InMemoryPost[0]);
            var controller = new PostsController(repoMock.Object);

            // Act
            var result = controller.GetAll() as OkObjectResult;

            // Assert
            Assert.IsAssignableFrom<IEnumerable<InMemoryPost>>(result.Value);
            Assert.Equal(result.Value, new InMemoryPost[0]);
        }


        [Fact]
        public void GettingByID_WithNonExistingID_ReturnsNotFound()
        {
            // Arrange
            ulong id = 5;
            var repoMock = new Mock<IRepository<InMemoryPost>>();
            repoMock.Setup(s => s.GetById(id)).Returns((InMemoryPost)null);
            var controller = new PostsController(repoMock.Object);

            // Act
            var result = controller.GetById(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }


        [Fact]
        public void GettingByID_WithExistingID_ReturnsPost()
        {
            // Arrange
            ulong id = 5;
            var post = new InMemoryPost() { Id = id };
            var repoMock = new Mock<IRepository<InMemoryPost>>();
            repoMock.Setup(s => s.GetById(id)).Returns(post);
            var controller = new PostsController(repoMock.Object);

            // Act
            var result = controller.GetById(id) as OkObjectResult;

            // Assert
            Assert.Equal(post, result.Value);
        }
    }
}
